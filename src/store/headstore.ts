import { observable, action} from 'mobx';

interface Head {
  title?: string
  path?: string
  active?: boolean
}

const data = [
    {
      title: "文章",
      path: "/home",
      active: true,
    },
    {
      title: "说说",
      path: "/home",
      active: false,
    },
    {
      title: "留言",
      path: "/message",
      active: false,
    },
    {
      title: "相册",
      path: "/photo",
      active: false,
    },
    {
      title: "友链",
      path: "/friend",
      active: false,
    },
  ]

export default class PlayStore {

@observable headdata: Head[] = data;

@action ChangHeadData = (_data: Head[],index: number) => {
  _data.map((e,_index) => {
      if (_index === index) {
        e.active = true
      } else {
        e.active = false
      }
    })
    this.headdata = _data
  }
}