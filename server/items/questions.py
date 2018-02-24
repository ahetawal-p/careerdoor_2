from toapi import Item, XPath

class Questions(Item):
    __base_url__ = 'https://www.careercup.com'

    qUrl = XPath("//span[@class='entry']/a/@href")
    qText = XPath("//span[@class='entry']/a/p/text()")
    ansCount = XPath("//span[@class='rating']/a/span/text()")
    qDate = XPath("//span[@class='author']/abbr/text()")
    qLocation = XPath("normalize-space(//span[@class='author']/text()[3])")
    qTags = XPath("//span[@class='tags']/a/text()")

    class Meta:
        source = XPath("//ul[@id='question_preview']"
                       "//li[@class='question']")
        route = {'/questions?companyurl=:companyurl': '/page?pid=:companyurl',
                 '/questions?companyurl=:companyurl&page=:page': '/page?pid=:companyurl&n=:page'}
