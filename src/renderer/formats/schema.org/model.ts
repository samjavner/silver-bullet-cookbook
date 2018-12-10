// Conformance

// Although it might be helpful for search applications if structured data markup always followed schema.org
// very strictly, in practice this is unrealistic. Our schemas also continue to evolve in response to feedback,
// discussion and new applications of the data. Where possible we amend existing definitions incrementally
// rather than introducing lots of new properties for similar use cases. We have consequently based schema.org
// on a very flexible datamodel, and take a pragmatic view of conformance.

// We expect schema.org properties to be used with new types, both from schema.org and from external extensions.
// We also expect that often, where we expect a property value of type Person, Place, Organization or some other
// subClassOf Thing, we will get a text string, even if our schemas don't formally document that expectation.
// In the spirit of "some data is better than none", search engines will often accept this markup and do the
// best we can. Similarly, some types such as Role and URL can be used with all properties, and we encourage
// this kind of experimentation amongst data consumers.

// Notes for toolmakers and schema authors

// This section is oriented towards extension authors and tool makers, i.e. creators of applications that consume,
// check or transform schema.org-based data. Most publishers and webmasters needn't worry about these details.

// Applications of schema.org can address conformance in several ways. Tools such as validators can check for
// application-specific patterns, such as the data structures required for some specific functionality. They may
// also check compliance with underlying formats (JSON-LD, Microdata, RDFa etc.), or offer additional hints that
// go beyond formal conformance (e.g. checking for readability issues or implausible data).

// While it is appropriate and useful for such checkers to warn about published data that may be difficult or
// ambiguous for consumers, they are not obliged to treat unexpected structures as errors. Schema.org's underlying
// datamodel is naturally flexible, and provides an extensible basis for rich structured data. We encourage both
// publishers and consumers to continue to explore and share new vocabulary ideas for evolving schema.org.

// It is not an error for a schema.org entity description to include properties from several independent types,
// e.g. something might simultaneously be both a Book and a Product and be usefully described with properties from
// both types. It is useful but not required for the relevant types to be included in such a description. This
// flexibility allows schema.org types to be developed with some decentralization, and for vocabulary to be re-used
// and combined in useful ways. When we list the expected types associated with a property (or vice-versa) we aim
// to indicate the main ways in which these terms will be combined in practice. This aspect of schema.org is
// naturally imperfect. For example the schemas for Volcano suggest that since volcanoes are places, they may have
// fax numbers. Similarly, we list the unlikely (but not infeasible) possibility of a Country having "opening hours".
// We do not attempt to perfect this aspect of schema.org's structure, and instead rely heavily on an extensive
// collection of illustrative examples that capture common and useful combinations of schema.org terms. The
// type/properties associations of schema.org are closer to "guidelines" than to formal rules, and improvements
// to the guidelines are always welcome.

// See also: Postel's Law

export interface AggregateRating {
    bestRating: number | string | undefined;
    ratingCount: number | undefined;
    ratingValue: number | undefined;
    reviewCount: number | undefined;
    worstRating: number | string | undefined;
}

export interface ImageObject {
    height: string | number | undefined;
    url: string;
    width: string | number | undefined;
}

export interface Organization {
    logo: ImageObject | undefined;
    name: string | undefined;
    url: string | undefined;
}

export interface Person {
    name: string | undefined;
    url: string | undefined;
}

export interface Rating {
    bestRating: number | string | undefined;
    ratingValue: number | undefined;
    worstRating: number | string | undefined;
}

export interface Recipe {
    aggregateRating: AggregateRating | undefined;
    authors: Person[];
    cookingMethods: string[];
    cookTime: string | undefined;
    dateModified: string | undefined;
    datePublished: string | undefined;
    description: string | undefined;
    headline: string | undefined;
    images: ImageObject[];
    keywords: string | undefined;
    mainEntityOfPage: boolean | undefined;
    name: string | undefined;
    prepTime: string | undefined;
    publisher: Organization | undefined;
    recipeCategories: string[];
    recipeIngredients: string[];
    recipeInstructions: string[];
    recipeYield: string | undefined;
    reviews: Review[];
    totalTime: string | undefined;
    url: string | undefined;
    warnings: string[];
}

export interface Review {
    author: Person | undefined;
    datePublished: string | undefined;
    reviews: Review[];
    reviewBody: string | undefined;
    reviewRating: Rating | undefined;
}
