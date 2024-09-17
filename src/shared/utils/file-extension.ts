const extension = {
    'application/pdf': '.pdf'
}

export const fileExtension = (mimetype: string) => {
    const ext = extension[mimetype];
    if (ext) return ext;
    return '.bin'
}