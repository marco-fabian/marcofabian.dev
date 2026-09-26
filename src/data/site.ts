// Dados de contato num lugar só.
export const site = {
  email: 'contato@marcofabian.dev',
  whatsapp: '5577999078348',
  linkedin: 'https://www.linkedin.com/in/marco-fabian',
  github: 'https://github.com/marco-fabian',
  cv: '/marco-fabian-cv.pdf',
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
