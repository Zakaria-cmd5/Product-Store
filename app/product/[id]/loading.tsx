import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailLoadingpage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-amber-50 rounded-lg shadow-xl max-w-5xl mx-auto mt-10">
      <div className="space-y-4">
        <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
          <Skeleton className="rounded-lg" />
        </div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};

export default ProductDetailLoadingpage;
