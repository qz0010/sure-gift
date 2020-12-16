import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

export interface ISocialItem {
  name: string;
  short_name: string;
  formatted_name?: string;
  url?: string;
  share_url?: string;
  mobileOnly?: boolean;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  public data: ISocialItem[] = [
    {
      name: 'facebook',
      short_name: 'fb',
      formatted_name: 'Facebook',
      url: 'https://www.facebook.com/SureArmenia',
      share_url: 'http://www.facebook.com/sharer.php?u=',
      icon: '/assets/svg/facebook.svg',
    },
    {
      name: 'vkontakte',
      short_name: 'vk',
      formatted_name: 'Вконтакте',
      url: null,
      share_url: 'http://vkontakte.ru/share.php?url=',
      icon: '/assets/svg/vk.svg',
    },
    {
      name: 'instagram',
      short_name: 'insta',
      formatted_name: 'Instagram',
      url: 'http://instagram.com/sure.armenia',
      // share_url: '#',
      icon: '/assets/svg/insta.svg',
    },
    {
      name: 'telegram',
      short_name: 'tg',
      formatted_name: 'Telegram',
      url: '',
      share_url: 'https://telega.cc/share/url?url=',
      icon: '/assets/svg/telegram.svg',
    },
    {
      name: 'whatsapp',
      short_name: 'ws',
      formatted_name: 'WhatsApp',
      url: '',
      share_url: 'whatsapp://send?text=',
      icon: '/assets/svg/whatsup.svg',
      mobileOnly: false,
    },
    // {
    //   name: 'viber',
    //   short_name: 'viber',
    //   formatted_name: 'Viber',
    //   url: '#',
    //   share_url: 'viber://forward?text=',
    //   icon: '/assets/svg/viber.svg',
    //   mobileOnly: false,
    // },
  ];

  constructor(private device: DeviceDetectorService) {}

  share(item: ISocialItem, href = true) {
    window.open(
      `${item.share_url + (href ? location.href : location.origin)}`,
      'displayWindow',
      this.device.isDesktop()
        ? `width=520,height=300,left=400,top=300,status=no,toolbar=no,menubar=no`
        : null
    );
  }
}
