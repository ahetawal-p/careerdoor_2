from toapi import Item, XPath


class Companies(Item):
    __base_url__ = 'https://www.careercup.com/categories'

    qUrl = XPath('//a/@href')
    qCount = XPath('//a/text()')
    companyName = XPath('translate(normalize-space(//text()[2]), "()", "")')

    class Meta:
        source = XPath("//div[@id='mainpagebody']"
                       "//div[@class='box'][1]"
                       "//div[@class='boxBody']"
                       "//div[not(@class='clearance')]")
        route = {'/companies': ''}

    def clean_qUrl(self, qUrl):
        return 'https://www.careercup.com%s' %qUrl
