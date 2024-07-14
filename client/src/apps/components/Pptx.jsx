import React from 'react'
import PptxGenJS from 'pptxgenjs'

const Pptx = ({ title, mainComment, comments }) => {
  console.log(comments)
  const createPresentation = () => {
    let pptx = new PptxGenJS()

    // Создание нового слайда
    let mainSlide = pptx.addSlide()

    // Добавление текста на слайд
    mainSlide.addText(title, {
      x: 0.5,
      y: 0.3,
      fontSize: 24,
      color: '363636',
    })

    mainSlide.addText(mainComment, {
      x: 0.5,
      y: 2,
      fontSize: 14,
      color: '363636',
    })

    comments.forEach((comment) => {
      // Создание нового слайда для каждого комментария
      let commentSlide = pptx.addSlide()
      commentSlide.addText(comment.comment, {
        x: 0.2,
        y: 1,
        fontSize: 18,
        color: '363636',
      })

      // Определение начальных позиций для изображений
      let xPos = 0.5
      let yPos = 2
      let imgWidth = 3
      let imgHeight = 3
      let margin = 0.2
      //   let imagesPerRow = 3

      comment.comment_image.forEach((image, index) => {
        // Проверка, если изображение не поместится на текущий слайд, создаем новый
        if (xPos + imgWidth > pptx.width) {
          xPos = 0.5
          yPos += imgHeight + margin

          if (yPos + imgHeight > pptx.height) {
            // Создание нового слайда и сброс позиций
            commentSlide = pptx.addSlide()
            yPos = 1.5
            commentSlide.addText(comment.comment, {
              x: 0.5,
              y: 1,
              fontSize: 24,
              color: '363636',
            })
          }
        }

        // Добавление изображения
        commentSlide.addImage({
          path: image.image,
          x: xPos,
          y: yPos,
          w: imgWidth,
          h: imgHeight,
        })
        xPos += imgWidth + margin

        // Смещение позиции для следующего изображения
        // if ((index + 1) % imagesPerRow === 0) {
        //   xPos = 0.5
        //   yPos += 2 + margin
        // }
      })
    })

    pptx.writeFile({ fileName: 'Presentation.pptx' })
  }

  return (
    <div>
      <button className="btn btn-warning" onClick={createPresentation}>
        Pptx
      </button>
    </div>
  )
}

export default Pptx
