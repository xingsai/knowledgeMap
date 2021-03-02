function directive(Vue) {
    
    //关闭密码输入框记录密码-下拉框(v-offpassselect)
    Vue.directive('offpassselect', {
        inserted: (el, binding) => {
            let timer;
            let input = el.querySelector('input') || el;
            input.addEventListener('focus', _ => {
                inputType();
            });

            function inputType() {
                input.value = input.value.trim();
                if (input.value === '') {
                    input.setAttribute('readonly', 'readonly');
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        input.removeAttribute('readonly');
                    }, 0)
                } else {
                    input.removeAttribute('readonly');
                    return
                }
            }
        }
    });

    //禁止按钮快速重复点击-提交等（v-forbidclick）（3000ms后恢复）
    Vue.directive('forbidclick', {
        inserted: (el, binding) => {
            el.addEventListener('click', (ev) => {
                let time = binding.value && binding.value.time || 3000; //按钮解禁时间
                if (el.tagName === 'BUTTON') {
                    el.disabled = true;
                    setTimeout(_ => { el.disabled = false; }, time);
                } else {
                    if (el.querySelector('#forbid-click-cover')) return
                    let childSpan = document.createElement('span');
                    let style = {
                        position: 'absolute', top: 0, left: 0, zIndex: 12,
                        display: 'block', width: '100%', height: '100%', background: 'transparent'
                    }
                    el.style.position = 'relative'; childSpan.id = 'forbid-click-cover';
                    childSpan.style.position = style.position; childSpan.style.top = style.top;
                    childSpan.style.left = style.left; childSpan.style.zIndex = style.zIndex;
                    childSpan.style.display = style.display; childSpan.style.width = style.width;
                    childSpan.style.height = style.height; childSpan.style.background = style.background;
                    childSpan.addEventListener('click', event => {
                        event.cancelBubble = true; event.stopPropagation();
                    });
                    el.appendChild(childSpan);
                    setTimeout(_ => { el.removeChild(childSpan); el.style.position = 'static'; }, time);
                }
            });
        }
    });
}



export default directive;