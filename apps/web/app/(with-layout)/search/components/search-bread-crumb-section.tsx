import { CategoryKey, CategoryOptionEng } from 'types/category';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components';
import { SvgHomeFill } from '@/icons';

type RenderBreadCrumbProps = {
  middleCategory: CategoryKey | '';
  subCategory: CategoryOptionEng | '';
};

export default function SearchBreadCrumbSection({
  middleCategory,
  subCategory,
}: RenderBreadCrumbProps) {
  return (
    <>
      {middleCategory && (
        <Breadcrumb className="flex h-[5.2rem] items-center self-stretch bg-gray-100 px-[11.9rem] opacity-80">
          <BreadcrumbList className="jp-body2 text-gray-600">
            <BreadcrumbItem className="flex aspect-square h-[4.4rem] w-[4.4rem] items-center justify-center p-[1rem]">
              <SvgHomeFill />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex h-[3.2rem] items-center justify-center gap-[1rem] px-[1.6rem] py-[1rem]">
              {middleCategory}
            </BreadcrumbItem>

            {subCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="flex h-[3.2rem] items-center justify-center gap-[1rem] px-[1.6rem] py-[1rem]">
                  {subCategory}
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </>
  );
}
