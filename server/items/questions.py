from toapi import Item, XPath, Css
from bs4 import BeautifulSoup


class Questions(Item):
    __base_url__ = 'https://www.careercup.com'

    qText = Css("span.entry", attr='html')
    ansCount = XPath("//span[@class='rating']/a/span/text()")
    qDate = XPath("//span[@class='author']/abbr/text()")
    qLocation = XPath("normalize-space(//span[@class='author']/text()[3])")
    qTags = XPath("//span[@class='tags']/a/text()")

    class Meta:
        source = XPath("//ul[@id='question_preview']"
                       "//li[@class='question']")
        route = {'/questions?companyurl=:url': '/page?pid=:url',
                 '/questions?companyurl=:url&page=:page':
                 '/page?pid=:companyurl&n=:page'}

    def clean_qText(self, qText):
        qTextStr = ""
        if qText:
            from lxml.html import tostring
            html = tostring(qText[0])
            # print(html)
            soup = BeautifulSoup(html, 'html.parser')
            for child in soup.a.contents:
                if child.select('code'):
                    if child.select('code')[0].pre['class']:
                        codeBlock = child.select('code')[0]
                        lang = codeBlock.pre['class'][0]
                        qTextStr += "---" + lang + "---"
                        qTextStr += codeBlock.pre.text
                        qTextStr += "!!!" + lang + "!!!"
                else:
                    qTextStr += child.text
        return qTextStr
