import Image from '../Image'

const Showcase = ({ image_url }) => {
  return (
    <div className="z-10">
      <Image src={image_url} className="w-136" alt="Showcase item" />
    </div>
  )
}

export default Showcase