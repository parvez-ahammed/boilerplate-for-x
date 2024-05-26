async function getAboutData(): Promise<string> {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    const response = await fetch(`${baseUrl}/about`);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data.about;
}

export { getAboutData }