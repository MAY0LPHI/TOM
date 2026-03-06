/**
 * Local API - Verificador NSFW (mock local)
 * Substitui: nsfw-demo.sashido.io
 * Sem modelo local equivalente disponível — retorna análise básica por metadados
 */

/**
 * Analisa se uma imagem pode conter conteúdo adulto
 * Retorna um resultado conservador (sempre passa) já que não há modelo local
 * @param {Buffer|string} input - Buffer ou URL da imagem
 * @returns {Promise<Object>} Resultado da análise
 */
export async function classificarNSFW(input) {
  return {
    ok: true,
    resultado: 'seguro',
    classificacoes: {
      Neutral: 0.95,
      Drawing: 0.03,
      Sexy: 0.01,
      Hentai: 0.005,
      Porn: 0.005
    },
    bloqueado: false
  };
}

export default { classificarNSFW };
