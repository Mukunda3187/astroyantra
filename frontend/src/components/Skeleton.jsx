export function SkeletonLine({ width = '100%', height = '0.9rem' }) {
  return <div className="skeleton-line" style={{ width, height }} />;
}

export function SkeletonCard() {
  return (
    <div className="panel reading-card">
      <SkeletonLine width="40%" height="1.1rem" />
      <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <SkeletonLine />
        <SkeletonLine width="90%" />
        <SkeletonLine width="75%" />
      </div>
    </div>
  );
}
