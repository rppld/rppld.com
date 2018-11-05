import React, { Component } from "react"
import styled from "styled-components"
import { space } from "../constants"
import { device } from "../media"
import { remap, getYOffset } from "../utils"

const Wrapper = styled.div`
  min-height: 100vh;
  text-align: center;
  padding: ${space.s1};
  display: flex;
  justify-content: center;
  transition: opacity 400ms;
  align-items: center;
  opacity: ${props => (props.show ? "1" : "0")};

  @media ${device.tablet} {
    padding: ${space.s2};
  }

  @media ${device.laptop} {
    padding: ${space.s3};
  }
`

class Outro extends Component {
  constructor(props) {
    super(props)
    this.state = { show: true }
    this.fadeText = this.fadeText.bind(this)
  }

  fadeText() {
    const el = this.parallaxContainer
    const scrollTop = getYOffset()
    const windowHeight = window.innerHeight
    let yPos = el.offsetTop - scrollTop
    // let yOffset = remap(yPos, windowHeight * 0.4, windowHeight, 0, 10)
    let opac = remap(yPos, 0, windowHeight, 2, 0)
    // el.style.transform = `translateY(${yOffset}px)`
    el.style.opacity = opac
  }

  componentDidMount() {
    this.setState((prevState, props) => ({
      show: true
    }))

    this.fadeText()
    window.addEventListener("scroll", this.fadeText)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.fadeText)
  }

  render() {
    return (
      <Wrapper show={this.state.show}>
        <div ref={comp => (this.parallaxContainer = comp)}>
          {this.props.children}
        </div>
      </Wrapper>
    )
  }
}

export default Outro
