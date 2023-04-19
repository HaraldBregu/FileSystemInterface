import { ProductDetail, ProductProperty } from "../shared/interfaces/product-detail";
import { Variant, VariantPropertyField } from "../shared/interfaces/variant";

export default class Utils {

    static isBlankString(str: string) {
        return (!str || /^\s*$/.test(str));
    }

    static countryCode(codeLang: string) {

    }

    static codeLanguagesToCountryCode(codeLang: string) {
        const code = codeLang.split('-')[1]
        var lower = code.toLocaleLowerCase()
        if (lower === "chs") {
            return "cn"
        }
        return lower
    }

    static codeLanguagesToCountryCodes() {
        return this.codeLanguages().map(data => {
            this.codeLanguagesToCountryCode(data)
        })
    }

    static codeLanguages(): string[] {
        return [
            "da-DK", // danmark
            "de-AT",
            "de-CH",
            "de-DE",
            "en-AU", // gb
            "en-BZ",
            "en-GB",
            "EN-IE",
            "EN-PH",
            "en-TT",
            "en-US",
            "es-AR",
            "es-ES",
            "es-MX",
            "fi-FI",
            "fr-BE",
            "fr-CH",
            "fr-FR",
            "it-CH",
            "it-IT",
            "ja-JP", // giappone
            "ko-KR", // korea
            "nb-NO", // boh
            "nl-BE",
            "pt-BR",
            "pt-PT",
            "ru-RU",
            "sv-SE",
            "zh-CHS", // boh
            "zh-CN", //
            "zh-HK"
        ]
    }

    static variantsFromProductDetail(productDetail: ProductDetail | undefined) {
        var variants: Variant[] = []

        if (productDetail === undefined)
            return variants

        var variantProperties = productDetail.properties.filter(data => data.type === "Variant") ?? [];

        variantProperties.forEach((property, index) => {
            const properties: VariantPropertyField[] = []

            properties.push({
                name: "VariantId",
                displayname: property.name,
                value: property.name,
                options: [],
                readonly: true
            })

            property.childs.forEach(data => {
                properties.push({
                    name: data.name,
                    displayname: data.displayname,
                    value: data.value ?? "",
                    options: data.options,
                    readonly: data.isreadonly
                })
            })

            variants.push({ properties: properties })
        })

        return variants
    }
}