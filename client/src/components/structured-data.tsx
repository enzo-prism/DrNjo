type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

export function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
