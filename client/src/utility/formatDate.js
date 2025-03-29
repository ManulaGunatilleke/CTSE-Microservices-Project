// export const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { day: 'numeric', month: 'short', year: 'numeric' };
//     const formattedDate = date.toLocaleDateString('en-US', options);
//     const day = date.getDate();
//     const suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
//     return formattedDate.replace(/(\d+)(th|st|nd|rd)/, `$1${suffix}`).replace(',', ''); // Remove comma after year
// };
