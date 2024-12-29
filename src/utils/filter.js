export default function filter(array, searchString) {
    const sanitize = (str) => str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    const sanitizedSearch = sanitize(searchString);

    return array.filter((item) => sanitize(item).includes(sanitizedSearch));
}
