<template>
    <div id="dashboard">
        <van-tabbar v-model="active" active-color="rgb(117, 163, 66)">
            <van-tabbar-item replace to="/dashboard/home">  
                <span>首页</span>
                <template #icon="props">
                    <img :src="props.active ? icon.active : icon.inactive" />
                </template>
            </van-tabbar-item>
             <van-tabbar-item replace to="/dashboard/category">
                <span>分类</span>
                <template #icon="props">
                    <img :src="props.active ? icon1.active : icon1.inactive" />
                </template>
            </van-tabbar-item>
             <van-tabbar-item replace to="/dashboard/cart" :badge="goodsNum > 0 ? goodsNum : ''">
                <span>购物车</span>
                <template #icon="props">
                    <img :src="props.active ? icon2.active : icon2.inactive" />
                </template>
            </van-tabbar-item>
             <van-tabbar-item replace to="/dashboard/mine">
                <span>我的</span>
                <template #icon="props">
                    <img :src="props.active ? icon3.active : icon3.inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import { getGoodsCart } from '../../service/api';
import {setStore} from './../../config/global'
export default {
    name:'Dashboard',
    data() {
    return {
      active: Number(sessionStorage.getItem('tabBarActiveIndex')) | 0,
      icon: {
        active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjJDMTkyREZFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjJDMTkyRTBFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMkMxOTJEREU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMkMxOTJERUU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpdOR98AAAGISURBVHja7Jg9SwNBEIb3jIoKGoRAqmCnaSWdGoySLoi1EOwFIZU2gh/gDxD0B0i0SBOt1FSKipIfoL2dnV1a9R14BRGj+Zi7VZiBB3KX2dnnSHZnuWDtaN4pxi4IwIZWwV6lOj3gAKzwehSsgleNwt1GHzj+JOf4We71+xYcAqdg6Zvv5N4Jc7wIxkENFH7IKTAnHrVgElyBbAu5WeYmoxIcA9dgso0xknvDsaEKpsEtmOjgwcY5Nh2WYIYTpLr436ZYI6MtmAOXIKGwLSVYK6cluAAuwIhix5Fa56zdlWCRe9mA049B1i52KiitqqzYDpu12jLnaktwC+yz8YcdAefabEVQkvfAtos+djh30EwwBg5ByfmLEh1iXwVlEVTBMmh4FGzQofqxMEVwmEt+EbyAvEfBPB3E5UzcRLAC5sAzmAV1j4J1OoiLHPUrIrgO7sE0eHD+QxymwJ24yT70SLm/FE9gRuvIH2qYoAmaYARvFn478bzZT2yCJmiCJmiCJvh/Bd8FGADhYzkqUbTO7QAAAABJRU5ErkJggg==',
        inactive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTFEQzBCMzBFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTFEQzBCMzFFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMURDMEIyRUU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMURDMEIyRkU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj29rG8AAAINSURBVHja7JdNKMNhHMc3Qyik1GolN1y1m/eXHUQSB6WWg5MV1yUOLk5ykJwUBznssjl4T5u2RdqFAw5c5jDLYUptjcTf99E3jRizZ/tr/X/1qf/L7/n9P3t63qY3m806iTED9GBKVsF8SXXywCKw8b4CjIEXGYXTjQKwRrknYuOzQrUFS8A6GAJxMEDifOZijiqC5WAX9IB70AU2SRef9TCnPNuCRnAAmsEtaAe+hPfiuo3vmplrzJZgNfCCenANWsDJF3mnlAsy18e2GRWsA35QCy5AI7hMkn8Fmphbw7Z1mRI08wNVIMCeC/2iXYi5Abb1s5ZUQTGePKASuEEniKTw4yJs42YND2tKEewFO6CMy4aYmdE/jN0o27pYa5u10xK0smARWAGD4DGNpemRNZZBMWtbkzUwmEym796JrWpJ5IA5MC5j60IoYIMLuJjl/RwCgVQEp8Esryd5Lzv2wQOwgG6Ke38SFCeReTABnsEoWNBlLg7BDQU7eMjY+yCUcNwycJwNfxLORigJ16tghB30PknEJHBSLqZTL2J0cNLpTbCUU74P3HFMqBUWOgiXLeEmBB3c7MOgFRyrKHhMhzDHpEMI2sER99UznfohHBo4geziyH9Ouf8UQR4ypBz5MxqaYM4LpvO/WEkxX6/14B97RtEmiSaoCWqCmqAm+H+3OkXit5Sc7MFXAQYAJ35uuKysSIcAAAAASUVORK5CYII=',
      },

      icon1: {
          active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjUyMTIxRDhFOTEzMTFFNzg2NzZBNTNDODEzMjY2MkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjUyMTIxRDlFOTEzMTFFNzg2NzZBNTNDODEzMjY2MkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNTIxMjFENkU5MTMxMUU3ODY3NkE1M0M4MTMyNjYyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNTIxMjFEN0U5MTMxMUU3ODY3NkE1M0M4MTMyNjYyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phs3pZYAAAIMSURBVHja7JhNKARhGMfH7poLSeHi4EAkhaScfNT6LGkPe5Tc3Dhgy0HJZyQ5KG4kRwchypFEuBHJZyQXNuTm+//UMzVpjZ1933mb5F+/y+7Ms7+deeed93njQnP+T806cVpsyQVBUAryQAp/HgZHYBPMgxOrIj5NfkpAH6j94fsEkAHqwABYAz1gJ9LBHr5CVkQbHYyCbQu5SKFjt8AYiI8kKCOJYBl0xliTzmkHKyBJtqAXLIAaCbWquZYuU5DGUZXEMewH/bIEi0HIgQetAxTJEBzgWyw7Xp4JhAQzbT6tdlMPskQEgwKTeDSh2kERwTLN+ZSLCBYoEMwXEUxTIJgmIqgrEIwXEXxQIPggInimQPBURHBXgeCeiOCiAsElEcENcO6gHNVeJ8FPmxh5B4MOCg7Tb4guFma5t5AdWpVPR7vkt2oBPkAzuJMoR7WauLaUBesFaABPEmo9goB5bMvqSXZ48XApUOMKVPDtld40UQ5AIZgALzbOe2NWwb5TXZ2RZ9AGssHIL9MQvYmGuD+mtERaIfkcmiKuQReTDnJAKj9k9/QKAzem4yf5j42DShWC5twyVqH+o5E7uoD5LeXR3JGw0STx7oTuNkHKFDjm8dvqRsFX7ocp3caK3U2CGk81tNuVDHpVPSSx7CrQFt2MWwUPzS2tR3N5/gX/vKDv2zL+/wrazZcAAwDRnWLlUtDpHgAAAABJRU5ErkJggg==',
          inactive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RURFMDBGQTFFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RURFMDBGQTJFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFREUwMEY5RkU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFREUwMEZBMEU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrzKScsAAALUSURBVHja7JhLSFRRGMfvjOMQPSCtNrMQMYooe9iAEFiZZC2kkiYRiWjnIqhF4iYCQaUCbaEFLoIeUPRCRCIooqDI1FIXopFlShFGD9ECbWFl/0/+By4yztyZc65cwj/8OKNz73f+nuf36QuHw9NWbPms5LQOREAeWA9W8Pej4DV4Du6CtzE7d8FgLqgGex0+/xBUgc5oX/ppIBZOFQR1oJ3mJsA1UAY2gHSOonw+DG7wGXn2BTgPUqONoGVAS0Ez2AP+gEZwBnyP854YPgVOgAB4BA6Bn/YR1FUKaKG5r2AnOOnAnFqPFSCf7xYyVtCkwVqwG3wD20FbEjHauJkkRgGoMWVwK6jktBbH25Fx9A4cZCwZ1RwTBms5xRe50HUlR88FxqzW3SSr+Vf/ApmcHhNKAx/BErBGZwQjPIZaDJoTjYFWxo7oGMxje88yr1a2O3QMbmbb7YLBHrYbdQyuZDvigsHPbFfpGFSH6ZQLBlXMVL/mYla7zrTSVR86Bt+rdeKCwWx1eOsYfMl2lwsGVcxXfgNHQRlPflPyM+ZMHzoGn3Kas0CpQYOljCmxn4nB6QRRkkv9LD/XGdosy0E9P5+TPnSThSu84EPgquZUy7vXGUuy8stOU/5YJcBfcJR38X5wEyxKwpy8cwsUMdYRxjaSsA6BfeAHKGHatSWB9yXv62CqPw4O2I4wIwYtVmSSTQ+zQ7mf7zCFD8wxnfLdbdDFe/0Dy4V2N4ompWUslsptV+Ek6ANf1P0KNoHF/Pk320vgmFtV3WxlsLMSHhnRNMhRfgIecH1LCdE7Hwbtkl25ltmPj9WeZOKfbM80sPR8zAJsXg06kdTHA2yLbbeUsU2iq1FVJPHQD3rNoKgJvJFCCRz3osEp1sOi09ztVkooFPKQx5nNs435oPy/537A8p4qWBPLPW950WA/byXPrcE5s9cFg/+1wcCsNH5hBBPVPwEGAJyClsRmj7jHAAAAAElFTkSuQmCC'
      },
      icon2: {
          active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mjg2QjNBMTlFOTEzMTFFNzg2NzZBNTNDODEzMjY2MkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mjg2QjNBMUFFOTEzMTFFNzg2NzZBNTNDODEzMjY2MkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyODZCM0ExN0U5MTMxMUU3ODY3NkE1M0M4MTMyNjYyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyODZCM0ExOEU5MTMxMUU3ODY3NkE1M0M4MTMyNjYyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph/2wSsAAAGXSURBVHja1Ji/S8NQEMdfrJuCm+go6Ci1oC5OulYX/xFRlA4FQbCDg7i6+ye4dxMHhSoVE38MduvgJkVBTLzAZZFn3vfVNncefMiQ6/XDu1zykmDvbC0xv8c00TWCMeI4v2CEIxUMLBzx+bIGQVu0+FjRKnirqcW2eCJ6xCwxplHwi2gTJWJe6xRnbb4kEiFe8wRbRj5CZAUlI8oTbPO1qFawx9OstsUa2hy5BCUH5YN4cQneCAo+ErHmFt8j262u4H7wARGUbHOECkq1OUQFJSY55iFR2+IO8Y4KPvNTpfD2ooLZ3rDwAUEFJdqsXjD8Nys4Cv7gjq/F9AE+UeQ+EV3BbG+YvuHNafr0YWtzWbtgRavgJx9rA361fCOaxPpfBA+I4yEt0jixSpwTh/0IbhD7jpyqsX8l+0nVUafO/+cluAPk7IKrheRt+wouATnLoCBSa9FXMAZyElAQyQt8Ba+BnCtQ0LsWIngyoJy+aiGC6fg3cs43OMcMo1ZpZXMGKdzkd5MpYpJv2hfEFnHqed/zqvUtwABIQI5ZOgbAZwAAAABJRU5ErkJggg==',
          inactive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTRGOTc1MDFFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTRGOTc1MDJFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNEY5NzRGRkU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNEY5NzUwMEU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt5O3fsAAAIfSURBVHjazJhNS0JBFIa9WpEUBQVhbiroGyTl/oNoZ/2AgnbR1kWLFkUQ9EHbNuWyP+IuKgosjL4XtXNRLTIpjLQz8Bpa1+sZ0Zk58DDCHc5955w5M+dq2bZd8FS2XiLt0WjeKs/DHs0mBFoO7OD5hAkCnSyJMWKqwAuTUuxk90SWGCTaTBT4TaQIHxEytYqLaT4iCpp4dhOY9Oi3a04EjyscRY1kEe++cROYwl4MYS+qtBGOwCyqWVTxkGKBY5wUl6ZZ9Y0yyomgrhullegnPonHagLPNURwGMffHZHnpljllTeO8YrTbqVBAKis4FuOwNI0h1UXCFeg6kr+PWK4AlVWshdFkkeRGJfiPsJPPBEfXIEPCnvDsvRyBarsDcsKhCtQZZr/CWySFLgHGt4H1hpBVSYdwUvsRXGBd+K3Ef8saO8NvRJzdXQ2NQmMmCrwC+NynT8tM0SCmHZ6qS8YDHLErRNbDQpSCzFAzBHNECsVQbGyNSJHxIhuogu/c5gTZX5ORjG/kq8VYkY2gnF8IywRu7jExXFzgrRPEcLJAWOxcUTLzVeg1Jdl23Y1p+84XsRqX/88E6t/wTHUzhCYwTw3X2JOh0yK84w5BeZ+48yzZPfgGcZ5h2cLGE+ZAqV9cfagSMUsMUm8odP14/+TbbRhsWIHXG9fnD0obAMV5mSbxKrEsSLli3sOJvBtIiqsBxV3iNXuS557Ur5+BBgAI9W4Gsv5EnQAAAAASUVORK5CYII='
      },
      icon3: {
          active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkY0QkUxQ0NFOTEzMTFFNzg2NzZBNTNDODEzMjY2MkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzJBREZFMjJFOTEzMTFFNzg2NzZBNTNDODEzMjY2MkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRjRCRTFDQUU5MTMxMUU3ODY3NkE1M0M4MTMyNjYyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRjRCRTFDQkU5MTMxMUU3ODY3NkE1M0M4MTMyNjYyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqBz51MAAAHgSURBVHjazJgxT8JAFMcPZDKpk3EzBUZlNEwSJC4KxuCoYXBk0ckwGKMx4iCrEzvyCRRYSAQ/gAs6KqOusmrqe+YNxrTnXWn77p/8wlB679e017vXmOM4AlNrrQvNLABFIA9kgCQwR8c+gDEwAgZAD3jTGbxR6f/8JoR+cng9wIbk/HliBdgHvoAu1gUedIrFNf6bBm6BIbCleXEzdM6QxkgHLbgLPAIlMX1KNNZeUIKnQPvX8xVEcKwbGnsqwWPgXIQXHPvEryDe1ksRfi6olpZgCmiK6NKkmsqC14AVoaBFNZUEVwOarX5md05FsCb4cvSfIC5fm4yCRXLwFCz6XP6CSoIcPAXzgj9rMsGMAYLLMsGkAYIpmaBlgKAlE4wJw/JXcGKA00Qm+GqA4Fgm+GSA4EgmeG+A4EAmiI3NJ6Mc1u7IBN+pReRKjxyku5kGo2BDZbuFfesdg1zHrWf22lEfRvxOxFoHOlv+F6AaoWCVamp1dW2VvjWAnFEtX30xPrTPIcrhwnDlty+epffiUsh7vy7V0hZsAYUIbnGBPoNoCVaAnQgnSZlqKgli41JneA/W3Rq2uEcDbTMI2m4fDNwEtxmXurKKYJZRMKsiaDMKLqoIcnZ2lu5Kwp5vAQYAWAJJHjtJnssAAAAASUVORK5CYII=',
          inactive:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTg4RThBQ0NFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTg4RThBQ0RFOTEyMTFFNzg2NzZBNTNDODEzMjY2MkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFODhFOEFDQUU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFODhFOEFDQkU5MTIxMUU3ODY3NkE1M0M4MTMyNjYyRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PimcaOcAAAOISURBVHjazJhNbAxhGMdndTmI6kroSkS2lTqgJ7ZOKAdaW6FNkEo0cayv7R7oQaJ7wMG69GM30ZPvpkGEhNIeStuDg3KqHhDqIEoltiouyvo/yX+TzWRn5p39mPEm/zyzOzPP83ufmffjGU8qldJyacFgsBwmBNVC1VAFtJSnf0BT0AQ0Aj2BprP5GR8fN43jsQsIsK0w7VA95FW87Q/0GIpBY3YAvTbA1sB0Qw386zf0CBqCXkDvoSTP+SC5vgbaRe2h5J4wr7dsShkE3CGYy3yESYLG0fsZnFOJI6/DcYL5+AochfqsMrhAAa5DHBHuDrQOTqMCZ+PN+ApF5V76EF+3oI68Mgi4MzAX+A61ASqR5Zpcxphkswsqgc7C73nbGeRjTcM1Z4PLo4mvZvo+x1jqgLihEqaXPyOAu6sVvonPCI97GVM5gz1QqbwvgItrxWvi+zZj9SgBoidbOJUkOeqK3cKM1cA51jKD7bRdyN50sekQ4wsHjLRTpoBcvnZzEk5ozrUEY4bIYJjBEFeXIZvzXL5ZnOGK5CWDIWAt7aDmfEvH3G4GWE37ygXAl7QbzAAraN+4APiWttIMsJR21gXAWR1DVkCP9p81PeAcbZkLLGU6hqyAH2jXugCYjjllBviadpMLgBtpJ8wAn9HWuQBYTztiBiiFzbzUEFhyVjhFxlg7GXvAEJALt5SIC7nrdaodgxZJbDKY7mZitG3omd+B7PkzNq4xy+0WejDG0tBntIkscOtmrAHGVtpRhzkfHUAPTxQRTnwfZKyTylt+9ESK6lb+7ATk/iLAic9OHrcypnpVhxv6WLdKadgPyEIOGvHVT99RxsqpcJeX9jkdxQEpoCvzAPMTLE6f4vtiToU7QBbDPIR2sKiR3e4SHsujSaDn3xQL9+XMWoQD4ifnPDl+Kt9s4OuXXcB7ME3QJ370mWNxk/nxaFD38eg7zy3TfTyq49yqcSIOc1slCVgF3QdgkzIg4A7D3GC2anDzu4xz22BOs7gqUXy0fwl2CRrN+L+KnZNMtiDOTUtAAMijFKAAdAQ3XTPIcDmzmf6AGcjYMsnm8yMX/lEuoZ8N4Fug67y+CvHmrQD3ScqhSQmMG1IWK0G+I9rDjqyHGhHvgdUo3kt71QquQCWnxLjCn40q08xm2mEHNwvDutimgAFdleVESw/C1SqDJKW52PDIPXZWEtfbPwEGAEoQM6+fZ0fdAAAAAElFTkSuQmCC'
      }
      
    };
    },
    //监视器见识active的值的变动
    watch:{
        active(value){
            console.log(value);
            let tabBarActiveIndex = value > 1 ? value : 0;
            //缓存到本地
            sessionStorage.setItem('tabBarActiveIndex', value   )
        }
    },
    //从vuex中拿到的所有的数据，状态都应该放到computed里面
    computed:{
        ...mapState(['shopCart', ['userInfo']]),
        goodsNum(){
            if(this.shopCart){
                //总的购物车商品数量
                let num = 0
                //取出对象中的所有的值
                Object.values(this.shopCart).forEach((goods) => {
                    num += goods.num
                })
                return num
            }else{
                return 0
            }
        }
    },
    mounted(){
        //自动登录
        this.reqUserInfo()
        //到这个钩子里面代表页面初始化完毕
        //1.获取购物车里面的数据
        this.initShopCart();
    },
    methods:{
        ...mapMutations(['INIT_SHOP_CART']),
        ...mapActions(['reqUserInfo']),
        async initShopCart(){
            if(this.userInfo.token){//已经登录
                //获取当前购物车的商品（服务器端）
                let result = await getGoodsCart(this.userInfo.token)
                console.log(5555555555555555);
                console.log(result);
                if(result.success_code === 200){
                    let cartArr = result.data
                    let shopCart ={}
                    //遍历
                    cartArr.forEach((value) => {
                        shopCart[value.goods_id] = {
                            "num": value.num,
                            "id": value.goods_id,
                            "name": value.goods_name,
                            "small_image": value.small_image,
                            "price": value.goods_price,
                            "checked": value.checked
                        }
                    })
                    //本地数据同步
                    setStore('shopCart', shopCart)
                    this.INIT_SHOP_CART()
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
#dashboard{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
</style>