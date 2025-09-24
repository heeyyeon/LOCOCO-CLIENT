export default function ProductNotFoundSection() {
  return (
    <div className="flex min-h-[50rem] w-full flex-col items-center justify-center py-[6rem]">
      <p className="body1 font-bold text-gray-800">検索結果がありません。</p>
      <p className="caption font-bold text-gray-600">
        ほかのキーワードを入力してください。
      </p>
    </div>
  );
}
