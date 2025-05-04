export default function ProductDetail({ params }: { params: { id: string } }) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Product ID: {params.id}</h2>
        {/* Product details will load dynamically here */}
      </div>
    );
  }
  