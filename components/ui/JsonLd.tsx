interface Props {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Renders JSON-LD structured data. Safe: server-serialised, no user input. */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
