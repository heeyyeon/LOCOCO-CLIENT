export default function NotFoundProductSection() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center gap-[1.2rem] py-[6rem]">
      <p className="jp-body1 font-bold text-gray-800">検索結果がありません。</p>
      <p className="jp-caption font-bold text-gray-600">
        ほかのキーワードを入力してください。
      </p>
    </div>
  );
}
