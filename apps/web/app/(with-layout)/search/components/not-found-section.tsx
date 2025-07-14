interface NotFoundSectionProps {
  variant?: 'product' | 'review';
}

export default function NotFoundSection({
  variant = 'product',
}: NotFoundSectionProps) {
  const styles = {
    product: 'flex flex-col items-center py-[6rem]',
    review: 'flex flex-col items-center gap-[1.2rem] self-stretch py-[6rem]',
  };

  const currentStyle = styles[variant];

  return (
    <div className={currentStyle}>
      <p className="jp-body1 font-bold text-gray-800">検索結果がありません。</p>
      <p className="jp-caption font-bold text-gray-600">
        ほかのキーワードを入力してください。
      </p>
    </div>
  );
}
