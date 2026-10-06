import { weeklyPerformance } from '@/lib/demo-data'

export function PerformanceChart({ title = 'Desempenho da semana' }: { title?: string }) {
  const max = Math.max(...weeklyPerformance.map((d) => d.views))

  return (
    <section className="panel p-5 sm:p-6" aria-labelledby="perf-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="perf-title" className="font-semibold">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">Visualizações e cliques nos últimos 7 dias</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-chart-3" aria-hidden="true" />
            Visualizações
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-primary" aria-hidden="true" />
            Cliques
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-52 items-end gap-2 sm:gap-4" role="img" aria-label="Gráfico de barras de visualizações e cliques por dia">
        {weeklyPerformance.map((d) => (
          <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="relative flex h-full w-full max-w-12 items-end justify-center">
              <div
                className="w-full rounded-t-md bg-chart-3/60"
                style={{ height: `${(d.views / max) * 100}%` }}
                title={`${d.views} visualizações`}
              />
              <div
                className="absolute bottom-0 w-1/2 rounded-t-md bg-primary"
                style={{ height: `${(d.clicks / max) * 100 * 2.5}%` }}
                title={`${d.clicks} cliques`}
              />
            </div>
            <span className="text-xs text-muted-foreground">{d.day}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
