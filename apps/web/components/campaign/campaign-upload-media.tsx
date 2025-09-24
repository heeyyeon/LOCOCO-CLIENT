'use client';

import { useState } from 'react';

import { FormSection } from 'components/forms';

import { DragDropArea } from './drag-drop';

export default function CampaignUploadMedia() {
  const [thumbnailFiles, setThumbnailFiles] = useState<File[]>([]);
  const [detailFiles, setDetailFiles] = useState<File[]>([]);

  return (
    <div className="flex w-full flex-col gap-[4.8rem]">
      <FormSection
        title="컨텐츠 썸네일 사진"
        description={`캠페인 상세페이지 썸네일에 보여질 사진들입니다. 고화질 사진을 첨부해주세요.
사진은 최대 5장까지 업로드 가능합니다.`}
      >
        <DragDropArea
          files={thumbnailFiles}
          onFilesChange={setThumbnailFiles}
          maxFiles={5}
        />
      </FormSection>

      <FormSection
        title="컨텐츠 상세페이지 사진"
        description={`캠페인 상세페이지에 보여질 사진들입니다. 고화질 사진을 첨부해주세요.
사진은 최대 15장까지 업로드 가능합니다.`}
      >
        <DragDropArea
          files={detailFiles}
          onFilesChange={setDetailFiles}
          maxFiles={15}
        />
      </FormSection>
    </div>
  );
}
