export default function drawLabel({ctx, label, x, y}) {
  ctx.save()
  ctx.font = '14px sans-serif'
  ctx.fillStyle = 'rgba(0,0,0,0.7)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillText(
    label,
    x,
    y
  )
  ctx.restore()
}