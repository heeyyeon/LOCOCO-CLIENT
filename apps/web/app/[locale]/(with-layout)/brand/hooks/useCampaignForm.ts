import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApiResponseCampaignBasicResponse,
  CampaignDraftRequest,
  CampaignPublishRequest,
} from '@typescript-swagger/data-contracts';
import { useRouter } from 'i18n/navigation';
import { getErrorMessage } from 'utils/getErrorMessage';

import { getWaitingApprovalCampaign } from '../api';
import {
  getSavedCampaignForm,
  reSaveCampaignForm,
  saveCampaignForm,
  submitCampaignForm,
  submitSavedCampaignForm,
} from '../create-campaign/api';

export const useCampaignFormAPI = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const useSavedCampaign = (id?: string) => {
    const { data, isLoading, isError } =
      useQuery<ApiResponseCampaignBasicResponse>({
        queryKey: ['saved-campaign', id],
        queryFn: () => getSavedCampaignForm(id!),
        enabled: !!id,
      });

    return {
      data: data?.data,
      isLoading,
      isError,
    };
  };

  const useWaitingApprovalCampaign = (campaignId?: string) => {
    const { data, isLoading, isError } =
      useQuery<ApiResponseCampaignBasicResponse>({
        queryKey: ['waiting-approval-campaign', campaignId],
        queryFn: () => getWaitingApprovalCampaign({ campaignId: campaignId! }),
        enabled: !!campaignId,
      });

    return {
      data: data?.data,
      isLoading,
      isError,
    };
  };

  const useSaveCampaign = () => {
    return useMutation({
      mutationFn: (formData: CampaignDraftRequest) =>
        saveCampaignForm(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['brand', 'campaigns'] });
        alert('임시저장 완료');
        router.push('/brand');
      },
      onError: (error) => {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      },
    });
  };

  const useReSaveCampaign = (id: string) => {
    return useMutation({
      mutationFn: (formData: CampaignDraftRequest) =>
        reSaveCampaignForm(formData, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['brand', 'campaigns'] });
        queryClient.invalidateQueries({ queryKey: ['saved-campaign', id] });
        alert('임시저장 완료');
        router.push('/brand');
      },
      onError: (error) => {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      },
    });
  };

  const usePublishNewCampaign = () => {
    return useMutation({
      mutationFn: (formData: CampaignPublishRequest) =>
        submitCampaignForm(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['brand', 'campaigns'] });
        alert('캠페인 생성 완료');
        router.push('/brand');
      },
      onError: (error) => {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      },
    });
  };

  const usePublishSavedCampaign = (id: string) => {
    return useMutation({
      mutationFn: (formData: CampaignPublishRequest) =>
        submitSavedCampaignForm(formData, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['brand', 'campaigns'] });
        queryClient.invalidateQueries({ queryKey: ['saved-campaign', id] });
        queryClient.invalidateQueries({
          queryKey: ['waiting-approval-campaign', id],
        });
        alert('캠페인 생성 완료');
        router.push('/brand');
      },
      onError: (error) => {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      },
    });
  };

  return {
    useSavedCampaign,
    useWaitingApprovalCampaign,
    useSaveCampaign,
    useReSaveCampaign,
    usePublishNewCampaign,
    usePublishSavedCampaign,
  };
};
