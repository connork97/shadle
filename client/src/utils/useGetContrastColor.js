const useGetContrastColor = (color) => {
    const rgb = color.substring(4, color.length - 1).split(', ');
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness >= 128 ? 'black' : 'white';
};

export default useGetContrastColor;