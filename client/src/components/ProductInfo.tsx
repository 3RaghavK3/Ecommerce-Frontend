export function AdditionalProductInfo({ productInfo }) {
  return (
    <div className="contents text-center">
      <div className="border rounded p-4">
        <span className="font-semibold">SKU:</span> {productInfo.sku}
      </div>

      <div className="border rounded p-4">
        <span className="font-semibold">Tags:</span>{" "}
        {productInfo.tags?.join(", ")}
      </div>

      <div className="border rounded p-4">
        <span className="font-semibold">Availability:</span>{" "}
        {productInfo.availabilityStatus}
      </div>

      <div className="border rounded p-4">
        <span className="font-semibold">Created At:</span>{" "}
        {productInfo.meta?.createdAt &&
          new Date(productInfo.meta.createdAt).toLocaleDateString()}
      </div>

      <div className="border rounded p-4">
        <span className="font-semibold">Updated At:</span>{" "}
        {productInfo.meta?.updatedAt &&
          new Date(productInfo.meta.updatedAt).toLocaleDateString()}
      </div>

      <div className="border rounded p-4">
        <span className="font-semibold">Warranty:</span>{" "}
        {productInfo.warrantyInformation}
      </div>

      <div className="border rounded p-4">
        <span className="font-semibold">Shipping:</span>{" "}
        {productInfo.shippingInformation}
      </div>

      <div className="border rounded p-4">
        <span className="font-semibold">Return:</span>{" "}
        {productInfo.returnPolicy}
      </div>

      <div className="border rounded p-4 col-span-2 md:col-span-1">
        <span className="font-semibold">Weight:</span> {productInfo.weight}g
      </div>
    </div>
  );
}
