beforeEach(() => {
    jest.resetModules();
})

let localizePathname;

describe('localizePathname', () => {

    describe('in English', () => {

        beforeEach(() => {
            jest.doMock('i18next', () => ({ language: 'en' }));
            require('i18next');
            localizePathname = require('./link').localizePathname;
        })

        it('should prefix paths', () => {
            expect(localizePathname('/talks')).toBe('/talks');
            expect(localizePathname('/talks', 'en')).toBe('/talks');
            expect(localizePathname('/talks', 'th')).toBe('/th/talks');
        });

        it('should not prefix full URLs', () => {
            expect(localizePathname('http://www.abhayagiri.org/'))
              .toBe('http://www.abhayagiri.org/');
        });

        it('should not changed relative paths', () => {
            expect(localizePathname('foo/bar')).toBe('foo/bar');
        });

        it('should correctly prefix paths with new', () => {
            expect(localizePathname('/new/about/purpose')).toBe('/new/about/purpose');
        });

        it('should not prefix with useNew false', () => {
            expect(localizePathname('/about/purpose', null, false))
                .toBe('/about/purpose');
            expect(localizePathname('/new/about/purpose', null, false))
                .toBe('/about/purpose');
        });

        it('should not prefix gallery with new', () => {
            expect(localizePathname('/gallery', null, false))
                .toBe('/gallery');
            expect(localizePathname('/gallery/123', null, false))
                .toBe('/gallery/123');
        });

    });

    describe('in Thai', () => {

        beforeEach(() => {
            jest.doMock('i18next', () => ({ language: 'th' }));
            require('i18next');
            localizePathname = require('./link').localizePathname;
        })

        it('should prefix paths', () => {
            expect(localizePathname('/talks')).toBe('/th/talks');
            expect(localizePathname('/talks', 'en')).toBe('/talks');
            expect(localizePathname('/talks', 'th')).toBe('/th/talks');
        });

        it('should not prefix full URLs', () => {
            expect(localizePathname('http://www.abhayagiri.org/'))
              .toBe('http://www.abhayagiri.org/');
        });

        it('should not changed relative paths', () => {
            expect(localizePathname('foo/bar')).toBe('foo/bar');
        });

        it('should correctly prefix paths with new', () => {
            expect(localizePathname('/new/about/purpose')).toBe('/new/th/about/purpose');
        });

        it('should not prefix with useNew false', () => {
            expect(localizePathname('/about/purpose', null, false))
                .toBe('/th/about/purpose');
            expect(localizePathname('/new/about/purpose', null, false))
                .toBe('/th/about/purpose');
        });

        it('should not prefix gallery with new', () => {
            expect(localizePathname('/th/gallery', null, false))
                .toBe('/th/gallery');
            expect(localizePathname('/th/gallery/123', null, false))
                .toBe('/th/gallery/123');
        });

    });

});
