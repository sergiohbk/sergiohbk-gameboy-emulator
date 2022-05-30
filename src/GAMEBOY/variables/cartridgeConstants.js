export const CARTRIDGE_TYPE = [
    {
        key: 1,
        name: "ROM ONLY",
        description: "Only ROM",
        mask: 0x00,
    },
    {
        key: 2,
        name: "ROM+MBC1",
        description: "ROM + MBC1",
        mask: 0x01,
    },
    {
        key: 3,
        name: "ROM+MBC1+RAM",
        description: "ROM + MBC1 + RAM",
        mask: 0x02,
    },
    {
        key: 4,
        name: "ROM+MBC1+RAM+BATTERY",
        description: "ROM + MBC1 + RAM + BATTERY",
        mask: 0x03,
    },
    {
        key: 5,
        name: "ROM+MBC2",
        description: "ROM + MBC2",
        mask: 0x05,
    },
    {
        key: 6,
        name: "ROM+MBC2+BATTERY",
        description: "ROM + MBC2 + BATTERY",
        mask: 0x06,
    },
    {
        key: 7,
        name: "ROM+RAM",
        description: "ROM + RAM",
        mask: 0x08,
    },
    {
        key: 8,
        name: "ROM+RAM+BATTERY",
        description: "ROM + RAM + BATTERY",
        mask: 0x09,
    },
    {
        key: 9,
        name: "ROM+MMM01",
        description: "ROM + MMM01",
        mask: 0x0B,
    },
    {
        key: 10,
        name: "ROM+MMM01+RAM",
        description: "ROM + MMM01 + RAM",
        mask: 0x0C,
    },
    {
        key: 11,
        name: "ROM+MMM01+RAM+BATTERY",
        description: "ROM + MMM01 + RAM + BATTERY",
        mask: 0x0D,
    },
    {
        key: 12,
        name: "ROM+MBC3+TIMER+BATTERY",
        description: "ROM + MBC3 + TIMER + BATTERY",
        mask: 0x0F,
    },
    {
        key: 13,
        name: "ROM+MBC3+TIMER+RAM+BATTERY",
        description: "ROM + MBC3 + TIMER + RAM + BATTERY",
        mask: 0x10,
    },
    {
        key: 14,
        name: "ROM+MBC3",
        description: "ROM + MBC3",
        mask: 0x11,
    },
    {
        key: 15,
        name: "ROM+MBC3+RAM",
        description: "ROM + MBC3 + RAM",
        mask: 0x12,
    },
    {
        key: 16,
        name: "ROM+MBC3+RAM+BATTERY",
        description: "ROM + MBC3 + RAM + BATTERY",
        mask: 0x13,
    },
    {
        key: 17,
        name: "ROM+MBC5",
        description: "ROM + MBC5",
        mask: 0x19,
    },
    {
        key: 18,
        name: "ROM+MBC5+RAM",
        description: "ROM + MBC5 + RAM",
        mask: 0x1A,
    },
    {
        key: 19,
        name: "ROM+MBC5+RAM+BATTERY",
        description: "ROM + MBC5 + RAM + BATTERY",
        mask: 0x1B,
    },
    {
        key: 20,
        name: "ROM+MBC5+RUMBLE",
        description: "ROM + MBC5 + RUMBLE",
        mask: 0x1C,
    },
    {
        key: 21,
        name: "ROM+MBC5+RUMBLE+RAM",
        description: "ROM + MBC5 + RUMBLE + RAM",
        mask: 0x1D,
    },
    {
        key: 22,
        name: "ROM+MBC5+RUMBLE+RAM+BATTERY",
        description: "ROM + MBC5 + RUMBLE + RAM + BATTERY",
        mask: 0x1E,
    },
    {
        key: 23,
        name: "ROM+MBC6",
        description: "ROM + MBC6",
        mask: 0x20,
    },
    {
        key: 24,
        name: "ROM+MBC7+SENSOR+RUMBLE+RAM+BATTERY",
        description: "ROM + MBC7 + SENSOR + RUMBLE + RAM + BATTERY",
        mask: 0x22,
    },
    {
        key: 25,
        name: "POCKET CAMERA",
        description: "Pocket Camera",
        mask: 0xFC,
    },
    {
        key: 26,
        name: "BANDAI TAMA5",
        description: "Bandai TAMA5",
        mask: 0xFD,
    },
    {
        key: 27,
        name: "HuC3",
        description: "HuC3",
        mask: 0xFE,
    },
    {
        key: 28,
        name: "HuC1+RAM+BATTERY",
        description: "HuC1 + RAM + BATTERY",
        mask: 0xFF,
    },
];

export const NEW_LICENSEE_CODE = [
    {
        key: 0,
        name: "NONE",
        description: "No new licensee code",
        mask: 0x00,
    },
    {
        key: 1,
        name: "NINTENDO R&D1",
        description: "Nintendo",
        mask: 0x01,
    },
    {
        key: 2,
        name: "CAPCOM",
        description: "Capcom",
        mask: 0x08,
    },
    {
        key: 3,
        name: "ELECTRONIC ARTS",
        description: "Electronic Arts",
        mask: 0x13,
    },
    {
        key: 4,
        name: "HUDSON",
        description: "Hudson Soft",
        mask: 0x18,
    },
    {
        key: 5,
        name: "B-AI",
        description: "Bandai",
        mask: 0x19,
    },
    {
        key: 6,
        name: "KSS",
        description: "KSS",
        mask: 0x20,
    },
    {
        key: 7,
        name: "POW",
        description: "POW",
        mask: 0x22,
    },
    {
        key: 8,
        name: "PCM COMPLETE",
        description: "PCM Complete",
        mask: 0x24,
    },
    {
        key: 9,
        name: "SAN-X",
        description: "SAN-X",
        mask: 0x25,
    },
    {
        key: 10,
        name: "KEMCO JAPAN",
        description: "Kemco Japan",
        mask: 0x28,
    },
    {
        key: 11,
        name: "SETAPIX",
        description: "Seta",
        mask: 0x29,
    },
    {
        key: 12,
        name: "VIACOM",
        description: "Viacom",
        mask: 0x30,
    },
    {
        key: 13,
        name: "NINTENDO",
        description: "Nintendo",
        mask: 0x31,
    },
    {
        key: 14,
        name: "BANDAI",
        description: "Bandai",
        mask: 0x32,
    },
    {
        key: 15,
        name: "ACCLAIM",
        description: "Acclaim",
        mask: 0x33,
    },
    {
        key: 16,
        name: "KONAMI",
        description: "Konami",
        mask: 0x34,
    },
    {
        key: 17,
        name: "HECT",
        description: "Hect",
        mask: 0x35,
    },
    {
        key: 18,
        name: "TAITO",
        description: "Taito",
        mask: 0x37,
    },
    {
        key: 19,
        name: "HUDSON",
        description: "Hudson",
        mask: 0x38,
    },
    {
        key: 20,
        name: "BANPRESTO",
        description: "Banpresto",
        mask: 0x39,
    },
    {
        key: 21,
        name: "BUGISOFT",
        description: "BugiSoft",
        mask: 0x41,
    },
    {
        key: 22,
        name: "ATLUS",
        description: "Atlus",
        mask: 0x42,
    },
    {
        key: 23,
        name: "MALIBU",
        description: "Malibu",
        mask: 0x44,
    },
    {
        key: 24,
        name: "ANGEL",
        description: "Angel",
        mask: 0x46,
    },
    {
        key: 25,
        name: "BULLET-PROOF",
        description: "Bullet-Proof",
        mask: 0x47,
    },
    {
        key: 26,
        name: "IREM",
        description: "Irem",
        mask: 0x49,
    },
    {
        key: 27,
        name: "ABSOLUTE",
        description: "Absolute",
        mask: 0x50,
    },
    {
        key: 28,
        name: "ACC",
        description: "Acclaim",
        mask: 0x51,
    },
    {
        key: 29,
        name: "ACT",
        description: "Activision",
        mask: 0x52,
    },
    {
        key: 30,
        name: "AMERICAN SAMMY",
        description: "American Sammy",
        mask: 0x53,
    },
    {
        key: 31,
        name: "KONAMI",
        description: "Konami",
        mask: 0x54,
    },
    {
        key: 32,
        name: "HI TECH",
        description: "Hi Tech",
        mask: 0x55,
    },
    {
        key: 33,
        name: "LJN",
        description: "LJN",
        mask: 0x56,
    },
    {
        key: 34,
        name: "MATCHBOX",
        description: "Matchbox",
        mask: 0x57,
    },
    {
        key: 35,
        name: "MATTEL",
        description: "Mattel",
        mask: 0x58,
    },
    {
        key: 36,
        name: "MILTON",
        description: "Milton Bradley",
        mask: 0x59,
    },
    {
        key: 37,
        name: "TITUS",
        description: "Titus",
        mask: 0x60,
    },
    {
        key: 38,
        name: "VIRGIN",
        description: "Virgin",
        mask: 0x61,
    },
    {
        key: 39,
        name: "LUCAS ARTS",
        description: "LucasArts",
        mask: 0x64,
    },
    {
        key: 40,
        name: "OCEAN",
        description: "Ocean",
        mask: 0x67,
    },
    {
        key: 41,
        name: "ELECTRONIC ARTS",
        description: "Electronic Arts",
        mask: 0x69,
    },
    {
        key: 42,
        name: "INFOGRAMES",
        description: "Infogrames",
        mask: 0x70,
    },
    {
        key: 43,
        name: "INTERPLAY",
        description: "Interplay",
        mask: 0x71,
    },
    {
        key: 44,
        name: "BRODERBUND",
        description: "Broderbund",
        mask: 0x72,
    },
    {
        key: 45,
        name: "SCLUPTURED",
        description: "Sculptured",
        mask: 0x73,
    },
    {
        key: 46,
        name: "SCI",
        description: "SCI",
        mask: 0x75,
    },
    {
        key: 47,
        name: "THQ",
        description: "THQ",
        mask: 0x78,
    },
    {
        key: 48,
        name: "ACCOLADE",
        description: "Accolade",
        mask: 0x79,
    },
    {
        key: 49,
        name: "MISAWA",
        description: "Misawa",
        mask: 0x80,
    },
    {
        key: 50,
        name: "LOZC",
        description: "LOZC",
        mask: 0x83,
    },
    {
        key: 51,
        name: "TOKUMA SHOTEN INTERMEDIA",
        description: "Tokuuma Shoten Intermedia",
        mask: 0x86,
    },
    {
        key: 52,
        name: "TSUKUDA ORIGINAL",
        description: "Tsukuda Original",
        mask: 0x87,
    },
    {
        key: 53,
        name: "CHUNSOFT",
        description: "Chunsoft",
        mask: 0x91,
    },
    {
        key: 54,
        name: "VIDEO SYSTEM",
        description: "Video System",
        mask: 0x92,
    },
    {
        key: 55,
        name: "OCEAN/ACC",
        description: "Ocean/Acc",
        mask: 0x93,
    },
    {
        key: 56,
        name: "VARIE",
        description: "Varie",
        mask: 0x95,
    },
    {
        key: 57,
        name: "YONEZAWAS",
        description: "Yonezawa",
        mask: 0x96,
    },
    {
        key: 58,
        name: "KANEKO",
        description: "Kaneko",
        mask: 0x97,
    },
    {
        key: 59,
        name: "PACK IN SOFT",
        description: "Pack-In-Soft",
        mask: 0x99,
    },
    {
        key: 60,
        name: "KONAMI (YU-GI-OH)",
        description: "Konami (Yu-Gi-Oh)",
        mask: 0xA4,
    },
];

export const OLDER_LICENSE_CODES = 0x014B;






















