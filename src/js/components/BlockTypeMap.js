import React from 'react';
import {
  ImageForm,
  ButtonForm,
  VideoForm,
  CarouselForm,
  ImageGalleryForm,
  CarouselWithContentForm,
  HeroForm,
  CardForm,
  MarqueeForm,
  AssetLinkForm,
  ParagraphCTAsForm
} from 'grommet-cms/containers/Dashboard/DashboardBlockForm';
import {
  BlockHeading,
  BlockHeadingWireframe,
  BlockParagraph,
  BlockParagraphWireframe,
  BlockParagraphForm,
  BlockImage,
  BlockImageWireframe,
  BlockSpacer,
  BlockSpacerForm,
  BlockSpacerWireframe,
  BlockCard,
  BlockCardWireframe,
  BlockQuote,
  BlockQuoteForm,
  BlockQuoteWireframe,
  BlockVideo,
  BlockVideoWireframe,
  BlockCarousel,
  BlockCarouselWireframe,
  BlockCarouselWithContent,
  BlockCarouselWithContentWireframe,
  GenericPreview,
  BlockColorSwatch,
  BlockColorSwatchForm,
  BlockColorSwatchPreview,
  BlockColorSwatchWireframe,
  BlockBox,
  BlockBoxForm,
  BlockHeadingForm,
  BlockBoxWireframe,
  BlockMarquee,
  BlockMarqueeWireframe,
  BlockHero,
  BlockHeroWireframe,
  BlockImageGallery,
  BlockImageGalleryWireframe,
  BlockButton,
  BlockButtonPreview,
  BlockButtonWireframe,
  BlockAssetLink,
  BlockAssetLinkWireframe,
  BlockParagraphCTAs,
  BlockParagraphCTAsWireframe
} from 'grommet-cms-content-blocks';

export default {
  BlockBox: {
    element: <BlockBox />,
    preview: <GenericPreview />,
    form: <BlockBoxForm />,
    name: 'Box',
    wireframe: <BlockBoxWireframe />
  },
  BlockParagraph: {
    element: <BlockParagraph />,
    preview: <GenericPreview />,
    form: <BlockParagraphForm />,
    name: 'Paragraph',
    wireframe: <BlockParagraphWireframe />
  },
  BlockParagraphCTAs: {
    element: <BlockParagraphCTAs />,
    name: 'Paragraph w/ CTAs',
    preview: <GenericPreview />,
    form: <ParagraphCTAsForm />,
    wireframe: <BlockParagraphCTAsWireframe />
  },
  BlockHeading: {
    element: <BlockHeading />,
    preview: <GenericPreview />,
    form: <BlockHeadingForm />,
    name: 'Headline',
    wireframe: <BlockHeadingWireframe />
  },
  BlockImage: {
    element: <BlockImage />,
    preview: <GenericPreview />,
    form: <ImageForm />,
    name: 'Image',
    wireframe: <BlockImageWireframe />
  },
  BlockImageGallery: {
    element: <BlockImageGallery />,
    preview: <GenericPreview />,
    form: <ImageGalleryForm />,
    name: 'Image Gallery',
    wireframe: <BlockImageGalleryWireframe />
  },
  BlockHero: {
    element: <BlockHero />,
    preview: <GenericPreview />,
    form: <HeroForm />,
    name: 'Hero',
    wireframe: <BlockHeroWireframe />
  },
  BlockMarquee: {
    element: <BlockMarquee />,
    preview: <GenericPreview />,
    form: <MarqueeForm />,
    name: 'Marquee',
    wireframe: <BlockMarqueeWireframe />
  },
  BlockCarousel: {
    element: <BlockCarousel />,
    preview: <GenericPreview />,
    form: <CarouselForm />,
    name: 'Carousel',
    wireframe: <BlockCarouselWireframe />
  },
  BlockCarouselWithContent: {
    element: <BlockCarouselWithContent />,
    preview: <GenericPreview />,
    form: <CarouselWithContentForm />,
    name: 'Carousel With Content',
    wireframe: <BlockCarouselWithContentWireframe />
  },
  BlockVideo: {
    element: <BlockVideo />,
    preview: <GenericPreview />,
    form: <VideoForm />,
    name: 'Video',
    wireframe: <BlockVideoWireframe />
  },
  BlockCardParagraph: {
    element: <BlockCard />,
    preview: <GenericPreview />,
    form: <CardForm />,
    name: 'Card',
    wireframe: <BlockCardWireframe />
  },
  BlockQuote: {
    element: <BlockQuote />,
    preview: <GenericPreview />,
    form: <BlockQuoteForm />,
    name: 'Quote',
    wireframe: <BlockQuoteWireframe />
  },
  BlockColorSwatch: {
    element: <BlockColorSwatch />,
    name: 'Color Swatch',
    preview: <BlockColorSwatchPreview />,
    form: <BlockColorSwatchForm />,
    wireframe: <BlockColorSwatchWireframe />
  },
  BlockSpacer: {
    element: <BlockSpacer />,
    name: 'Spacer',
    preview: <GenericPreview />,
    form: <BlockSpacerForm />,
    wireframe: <BlockSpacerWireframe />
  },
  BlockButton: {
    element: <BlockButton />,
    name: 'Button',
    preview: <BlockButtonPreview />,
    form: <ButtonForm />,
    wireframe: <BlockButtonWireframe />
  },
  BlockAssetLink: {
    element: <BlockAssetLink />,
    name: 'Asset Link (Deprecated)',
    preview: <GenericPreview />,
    form: <AssetLinkForm />,
    wireframe: <BlockAssetLinkWireframe />
  }
};
