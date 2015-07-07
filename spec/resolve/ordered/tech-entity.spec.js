var expect  = require('chai').expect,
    _       = require('lodash'),
    resolve = require('../../../lib/index').resolve;

describe('resolving ordered dependencies: tech - entity', function () {
    it('should resolve tech in entity depending on another entity', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'A' },
                    tech: 'css',
                    dependOn: [{
                        entity: { block: 'B' },
                        order: 'dependenceBeforeDependants'
                    }]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts);

        expect(resolved.entities).to.contain({ block: 'B' });
    });

    it('should resolve tech in entity depending on multiple entities', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'A' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'B' },
                            order: 'dependenceBeforeDependants'
                        },
                        {
                            entity: { block: 'C' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts);

        expect(resolved.entities).to.contain({ block: 'B' })
            .and.to.contain({ block: 'C' });
    });

    it('should resolve multiple techs in entity depending on another entity', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'A' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'B' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                },
                {
                    entity: { block: 'A' },
                    tech: 'js',
                    dependOn: [
                        {
                            entity: { block: 'B' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts);

        expect(resolved.entities).to.contain({ block: 'B' });
    });

    it('should resolve tech in multiple entities depending on another entity', function () {
        var decl = [
                { block: 'A' },
                { block: 'B' }
            ],
            deps = [
                {
                    entity: { block: 'A' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'C' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                },
                {
                    entity: { block: 'B' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'C' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts);

        expect(resolved.entities).to.contain({ block: 'C' });
    });

    it('should resolve tech dependency depending on another entity', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'A' },
                    dependOn: [
                        {
                            entity: { block: 'B' }
                        }
                    ]
                },
                {
                    entity: { block: 'B' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'C' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts);

        expect(resolved.entities).to.contain({ block: 'C' });
    });

    it('should resolve tech dependency depending on multiple entities', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'A' },
                    dependOn: [
                        {
                            entity: { block: 'B' }
                        }
                    ]
                },
                {
                    entity: { block: 'B' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'C' },
                            order: 'dependenceBeforeDependants'
                        },
                        {
                            entity: { block: 'D' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts);

        expect(resolved.entities).to.contain({ block: 'C' })
            .and.to.contain({ block: 'D' });
    });

    it('should resolve multiple tech dependencies depending on another entity', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'A' },
                    dependOn: [
                        {
                            entity: { block: 'B' }
                        },
                        {
                            entity: { block: 'C' }
                        }
                    ]
                },
                {
                    entity: { block: 'B' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'D' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                },
                {
                    entity: { block: 'C' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'D' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts);

        expect(resolved.entities).to.contain({ block: 'D' });
    });

    it('should include entity once if tech of multiple entities depend on this entity', function () {
        var decl = [
                { block: 'A' },
                { block: 'B' }
            ],
            deps = [
                {
                    entity: { block: 'A' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'C' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                },
                {
                    entity: { block: 'B' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'C' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts),
            firstIndex = _.findIndex(resolved.entities, { block: 'C' }),
            lastIndex = _.findLastIndex(resolved.entities, { block: 'C' });

        expect(resolved.entities).to.contain({ block: 'C' });
        expect(firstIndex).to.be.equal(lastIndex);
    });

    it('should not include tech dependency if no entity from decl depends on it and this entity has ' +
        'dependency on entity listed in decl', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'B' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'A' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts);

        expect(resolved.entities).not.to.contain({ block: 'B' });
    });

    it('should not include tech dependencie\'s dependency if no entity from decl\'s dependencies depends ' +
        'on it', function () {
        var decl = [{ block: 'A' }],
            deps = [
                {
                    entity: { block: 'C' },
                    tech: 'css',
                    dependOn: [
                        {
                            entity: { block: 'D' },
                            order: 'dependenceBeforeDependants'
                        }
                    ]
                }
            ],
            opts = { tech: 'css' },
            resolved = resolve(decl, deps, opts);

        expect(resolved.entities).to.not.contain({ block: 'D' });
    });
});