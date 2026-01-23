<script lang="ts">
    import { onMount } from 'svelte'

    import { dayjs } from '@sathene/dayjs'
    import { cn } from '@sathene/ui'

    const hours = Array.from<number>({ length: 24 }).fill(0)
    const hourBoxHeight = 125

    let wrapper = $state<HTMLDivElement | null>(null)
    let hasRun = $state(false)

    let needlePosition = $state(0)

    onMount(() => {
        calcNeedlePosition()
        const interval = setInterval(() => calcNeedlePosition(), 1000)
        return () => clearInterval(interval)
    })

    $effect(() => {
        if (!hasRun && needlePosition !== 0) {
            hasRun = true
            if (wrapper) {
                wrapper.scrollTo({
                    top: needlePosition - 200,
                    behavior: 'smooth'
                })
            }
        }
    })

    function calcNeedlePosition() {
        const time = dayjs()
        const hour = time.hour()
        const minute = time.minute()

        const hourPosition = hour * hourBoxHeight
        const minutePosition = hourBoxHeight / (60 / minute)
        const finalPosition = hourPosition + minutePosition

        needlePosition = finalPosition
    }
</script>

<div class="dashboard-timeline h-full overflow-y-hidden">
    <div
        class="relative grid h-full w-full grid-rows-[repeat(24,125px)] overflow-y-scroll border-l"
        bind:this={wrapper}
    >
        {#each hours as _, i}
            <div class="grid grid-cols-[75px_1fr]">
                <div
                    class={cn(
                        'h-full w-full border-r border-b p-2 text-center',
                        i === hours.length - 1 && 'border-b-0'
                    )}
                >
                    <p class="text-muted-foreground">{i}:00</p>
                </div>

                <div
                    class={cn('h-full w-full border-b p-2', i === hours.length - 1 && 'border-b-0')}
                ></div>
            </div>
        {/each}

        <div class="absolute right-0 h-px w-[calc(100%-71.4px)]" style={`top: ${needlePosition}px`}>
            <div class="bg-primary absolute right-0 h-px w-[calc(100%-10px)]"></div>
            <div class="bg-primary absolute -top-0.5 h-1.5 w-1.5 rounded-full"></div>
        </div>
    </div>
</div>
