// Dados de contato num lugar só.
// TODO: trocar para contato@marcofabian.dev quando o e-mail do domínio estiver ativo.
export const site = {
  email: 'marcofabianufmg@hotmail.com',
  whatsapp: '5577999078348',
  linkedin: 'https://www.linkedin.com/in/marco-fabian',
  github: 'https://github.com/marco-fabian',
  cv: '/marco-fabian-cv.pdf',
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
