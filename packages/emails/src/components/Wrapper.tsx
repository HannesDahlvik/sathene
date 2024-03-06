import type { PropsWithChildren } from 'react'

import { Body, Container, Head, Html, Preview, Tailwind } from '@react-email/components'

const tailwindConfig = require('../../../ui/web/src/tailwind.config') as any

interface Props extends PropsWithChildren {
    title: string
    previewText?: string
}

export function Wrapper({ previewText, title, children }: Props) {
    return (
        <Html>
            <Head title={title} />
            <Preview>{previewText ?? ''}</Preview>
            <Tailwind config={tailwindConfig}>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="bg-[#f0f0f0] border border-solid border-[#c8c8c8] rounded-[8px] mx-auto my-20">
                        {children}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
