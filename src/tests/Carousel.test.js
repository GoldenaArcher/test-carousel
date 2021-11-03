import { shallow } from 'enzyme';
import React from 'react';
import Carousel from '../Carousel';
import CarouselSlide from '../CarouselSlide';
import CarouselButton from '../CarouselButton';

describe('Carousel', () => {
  let wrapper;

  const slides = [
    {
      imgUrl: 'http://example.com/slide1.png',
      description: 'Slide 1',
      attribution: 'Uno Pizzeria'
    },
    {
      imgUrl: 'http://example.com/slide2.png',
      description: 'Slide 2',
      attribution: 'Dos Equis'
    },
    {
      imgUrl: 'http://example.com/slide3.png',
      description: 'Slide 3',
      attribution: 'Three Amigos'
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides} />);
  });

  it('renders a <div>', () => {
    expect(wrapper.type()).toBe('div');
  });

  it('renders the current slide as a CarouselSlide', () => {
    let slideProps;
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({
      ...slides[0],
      ...CarouselSlide.defaultProps
    });
  });

  it('renders a CarouselButton labeled "Prev" ', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(0)
        .prop('children')
    ).toBe('Prev');
  });

  it('renders a CarouselButton labeled "Next" ', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(1)
        .prop('children')
    ).toBe('Next');
  });

  it('render next slide once `next` is clicked', () => {
    const buttons = wrapper.find(CarouselButton);
    // next
    buttons.at(1).simulate('click');
    let slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({
      ...slides[1],
      ...CarouselSlide.defaultProps
    });
  });

  it('render next slide once `prev` is clicked', () => {
    const buttons = wrapper.find(CarouselButton);
    // next
    buttons.at(0).simulate('click');
    let slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({
      ...slides[slides.length - 1],
      ...CarouselSlide.defaultProps
    });
  });
});
