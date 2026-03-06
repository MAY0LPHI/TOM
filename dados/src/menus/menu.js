export default async function menu(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╔══「 💀 *${botName}* 💀 」══╗\n║  👾 *#user#*\n╚══[ 🔐 SISTEMA ATIVO ]══╝`,
    menuTopBorder = "╔══",
    bottomBorder = "╚══[ ⚡ FIM DO LOG ]══╝",
    menuTitleIcon = "🖥️",
    menuItemIcon = "  ⌨️  ",
    separatorIcon = "💾",
    middleBorder = "║"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    return `${formattedHeader}

${menuTopBorder}${separatorIcon} *ACESSO PRINCIPAL* ${separatorIcon}══╗
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}menuia
${middleBorder}${menuItemIcon}${prefix}menudown
${middleBorder}${menuItemIcon}${prefix}menuadm
${middleBorder}${menuItemIcon}${prefix}menubn
${middleBorder}${menuItemIcon}${prefix}menudono
${middleBorder}${menuItemIcon}${prefix}menumemb
${middleBorder}${menuItemIcon}${prefix}ferramentas
${middleBorder}${menuItemIcon}${prefix}menufig
${middleBorder}${menuItemIcon}${prefix}alteradores
${middleBorder}${menuItemIcon}${prefix}menurpg
${middleBorder}${menuItemIcon}${prefix}menuvip
${bottomBorder}
`;
}
