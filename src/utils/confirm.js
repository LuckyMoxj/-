/** confirm.js */
// import { MessageBox } from 'element-ui'
import { ElMessageBox } from 'element-plus'

// export function handleCofirm(text = '确定执行此操作吗？', type = 'warning') {
//     return MessageBox.confirm(text, '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: type,
//         center: true
//     })
// }

export function handleCofirm(){
    return  ElMessageBox.confirm('确定执行此操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
}
