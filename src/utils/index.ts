export function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);

    const options: any = {
        weekday: "short",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    return new Intl.DateTimeFormat('en-IN', options).format(date);
}