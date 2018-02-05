from toapi import Item, XPath


class Page(Item):
    __base_url__ = 'http://www.dy2018.com'

    url = XPath('//b//a[@class="ulink"]/@href')
    title = XPath('//b//a[@class="ulink"]/text()')

    class Meta:
        source = XPath('//table[@class="tbspan"]')
        route = {'/movies/?page=1': '/html/gndy/dyzz/',
                 '/movies/?page=:page': '/html/gndy/dyzz/index_:page.html',
                 '/movies/': '/html/gndy/dyzz/'}
