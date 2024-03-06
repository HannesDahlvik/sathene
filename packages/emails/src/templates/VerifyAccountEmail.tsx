import type { User } from '@sathene/db'

import { Title } from '../components/Title'
import { Wrapper } from '../components/Wrapper'

interface Props {
    user: User
    verificationCode: string
}

export default function VerifyAccountEmail({ user, verificationCode }: Props) {
    return (
        <Wrapper title="Verify Email">
            <Title title="" />
        </Wrapper>
    )
}
