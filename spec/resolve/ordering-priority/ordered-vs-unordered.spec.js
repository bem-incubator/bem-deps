var expect  = require('chai').expect,
    _       = require('lodash'),
    resolve = require('../../../lib/index').resolve;

describe('resolve: ordering priority - ordered deps vs unordered deps', function () {
    it('should prioritise ordered dependency over decl recommended ordering', function () {
        var decl = [
                { block: 'A' },
                { block: 'B' }
            ],
            deps = [
                {
                    entity: { block: 'A' },
                    dependOn: [
                        {
                            entity: { block: 'B' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            resolved = resolve(decl, deps),
            indexA = _.findIndex(resolved.entities, { block: 'A' }),
            indexB = _.findIndex(resolved.entities, { block: 'B' });

        expect(indexB).to.be.below(indexA);
    });

    it('should prioritise ordered dependency over deps recommended ordering', function () {
        var decl = [
                { block: 'A' }
            ],
            deps = [
                {
                    entity: { block: 'A' },
                    dependOn: [
                        {
                            entity: { block: 'B' }
                        },
                        {
                            entity: { block: 'C' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            resolved = resolve(decl, deps),
            indexB = _.findIndex(resolved.entities, { block: 'B' }),
            indexC = _.findIndex(resolved.entities, { block: 'C' });

        expect(indexC).to.be.below(indexB);
    });
});