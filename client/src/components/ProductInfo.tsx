import { Card, CardContent } from "./ui/card";

export function AdditionalProductInfo({ productInfo }) {
  return (
    <>
      <Card className="rounded-none">
        <CardContent>
          <span className="font-semibold">SKU:</span> {productInfo.sku}
        </CardContent>
      </Card>
      <Card className="rounded-none">
        <CardContent>
          <span className="font-semibold">Tags:</span>{" "}
          {productInfo.tags?.join(", ")}
        </CardContent>
      </Card>
      <Card className="rounded-none">
        <CardContent>
          <span className="font-semibold">Availability:</span>{" "}
          {productInfo.availabilityStatus}
        </CardContent>
      </Card>

      <Card className="rounded-none">
        <CardContent>
          <span className="font-semibold">Created At:</span>{" "}
          {productInfo.meta?.createdAt &&
            new Date(productInfo.meta.createdAt).toLocaleDateString()}
        </CardContent>
      </Card>
      <Card className="rounded-none">
        <CardContent>
          <span className="font-semibold">Updated At:</span>{" "}
          {productInfo.meta?.updatedAt &&
            new Date(productInfo.meta.updatedAt).toLocaleDateString()}
        </CardContent>
      </Card>
      <Card className="rounded-none">
        <CardContent>
          <span className="font-semibold">Warranty:</span>{" "}
          {productInfo.warrantyInformation}
        </CardContent>
      </Card>

      <Card className="rounded-none">
        <CardContent>
          <span className="font-semibold">Shipping:</span>{" "}
          {productInfo.shippingInformation}
        </CardContent>
      </Card>
      <Card className="rounded-none">
        <CardContent>
          <span className="font-semibold">Return:</span>{" "}
          {productInfo.returnPolicy}
        </CardContent>
      </Card>
      <Card className="rounded-none">
        <CardContent>
          <span className="font-semibold">Weight:</span> {productInfo.weight}g
        </CardContent>
      </Card>
    </>
  );
}
