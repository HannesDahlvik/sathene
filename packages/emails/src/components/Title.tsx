import { Heading, Section } from '@react-email/components'

interface Props {
    title: string
}

export function Title({ title }: Props) {
    return (
        <Section
            className="flex bg-[#0f0f0f] w-full mb-4 p-4"
            style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        >
            <Heading className="text-white w-full">{title}</Heading>
        </Section>
    )
}
