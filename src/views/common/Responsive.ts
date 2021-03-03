export const onMobile = "@media(max-width: 500px)"
export const onDesktop = "@media(min-width: 1024px)"

// 使い方

// const SectionTitle = styled.div({
//     fontSize: '25px',
//     display: 'flex',
//     [onMobile]: {    // モバイルの時のみ反映
//         fontSize: '40px'
//     },
//     [onDesktop]: {   // デスクトップの時のみ反映
//         fontSize: '100px'
//     }
// })