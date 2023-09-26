import { View, Button } from 'react-native'
import { Link } from 'expo-router'

interface NavButtonProps {
    title: string,
    href: string
}

export default function NavButton(props: NavButtonProps) {
    return (
        <>
        <Link href={props.href} asChild>
            <Button title={props.title}></Button>
        </Link>
        </>
    )
}