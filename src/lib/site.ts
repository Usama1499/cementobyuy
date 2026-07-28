export const site = {
  name: "Cemento",
  tagline: "Perth's best micro cement",
  phoneDisplay: "0410 040 994",
  phoneHref: "tel:+61410040994",
  whatsappNumber: "61410040994",
  address: "17 Irvine Street, Malaga WA 6090",
  addressShort: "Malaga, Western Australia",
  facebook: "https://www.facebook.com/cementomicrocement",
  hours: "Mon – Fri, 7:00am – 4:00pm",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message.slice(0, 1800))}`;
}
