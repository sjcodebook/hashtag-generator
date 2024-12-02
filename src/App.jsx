import { useState, useEffect, useCallback } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Stack, Typography, TextField, Button, Card, CardContent } from '@mui/material'

import { hashtags } from '../hashtags'

export default function App() {
  const [small, setSmall] = useState(20)
  const [medium, setMedium] = useState(6)
  const [large, setLarge] = useState(2)
  const [extraLarge, setExtraLarge] = useState(2)
  const [generatedSmall, setGeneratedSmall] = useState('')
  const [generatedMedium, setGeneratedMedium] = useState('')
  const [generatedLarge, setGeneratedLarge] = useState('')
  const [generatedExtraLarge, setGeneratedExtraLarge] = useState('')
  const [generatedSet, setGeneratedSet] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const generateHashtagSet = useCallback(() => {
    if (small + medium + large + extraLarge > 30) {
      alert('Total hashtags should not exceed 30')
      return
    }
    const hashtagSet = []
    const generatedSmallSet = []
    const generatedMediumSet = []
    const generatedLargeSet = []
    const generatedExtraLargeSet = []
    for (let i = 0; i < small; i++) {
      const index = Math.floor(Math.random() * hashtags.small.length)
      generatedSmallSet.push(hashtags.small[index])
      hashtagSet.push(hashtags.small[index])
    }
    for (let i = 0; i < medium; i++) {
      const index = Math.floor(Math.random() * hashtags.medium.length)
      generatedMediumSet.push(hashtags.medium[index])
      hashtagSet.push(hashtags.medium[index])
    }
    for (let i = 0; i < large; i++) {
      const index = Math.floor(Math.random() * hashtags.large.length)
      generatedLargeSet.push(hashtags.large[index])
      hashtagSet.push(hashtags.large[index])
    }
    for (let i = 0; i < extraLarge; i++) {
      const index = Math.floor(Math.random() * hashtags.extraLarge.length)
      generatedExtraLargeSet.push(hashtags.extraLarge[index])
      hashtagSet.push(hashtags.extraLarge[index])
    }
    setGeneratedSmall(generatedSmallSet.join(' '))
    setGeneratedMedium(generatedMediumSet.join(' '))
    setGeneratedLarge(generatedLargeSet.join(' '))
    setGeneratedExtraLarge(generatedExtraLargeSet.join(' '))
    setGeneratedSet(hashtagSet.join(' '))
  }, [extraLarge, large, medium, small])

  const copyHashtagSet = useCallback(() => {
    navigator.clipboard.writeText(generatedSet)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }, [generatedSet])

  useEffect(() => {
    // add event listener for enter button press
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'x') {
        generateHashtagSet()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
  }, [generateHashtagSet])

  useEffect(() => {
    // add event listener for cmd + c or ctrl + c
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        copyHashtagSet()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
  }, [copyHashtagSet])

  return (
    <Stack mt={10} mb={10} justifyContent='center' alignItems='center' gap={4}>
      <CssBaseline />
      <Typography
        variant='h3'
        sx={{
          textDecoration: 'underline',
        }}>
        Hashtag Generator
      </Typography>
      <Stack direction='row' justifyContent='center' alignItems='center' gap={2}>
        <TextField
          type='number'
          value={small}
          label='Small (10K - 100K posts)'
          variant='outlined'
          onChange={(e) => setSmall(Number(e.target.value))}
        />
        <TextField
          type='number'
          value={medium}
          label='Medium (100K - 300K posts)'
          variant='outlined'
          onChange={(e) => setMedium(Number(e.target.value))}
        />
        <TextField
          type='number'
          value={large}
          label='Large (300K - 500K posts)'
          variant='outlined'
          onChange={(e) => setLarge(Number(e.target.value))}
        />
        <TextField
          type='number'
          value={extraLarge}
          label='Extra Large (500K+ posts)'
          variant='outlined'
          onChange={(e) => setExtraLarge(Number(e.target.value))}
        />
      </Stack>
      <Button variant='contained' onClick={generateHashtagSet}>
        Generate Hashtag Set
      </Button>
      <TextField
        value={generatedSet}
        label='Generated Hashtag Set'
        variant='outlined'
        disabled
        multiline
        rows={10}
        sx={{
          width: '50%',
        }}
      />
      <Button variant='contained' color='secondary' onClick={copyHashtagSet}>
        {isCopied ? 'Copied!' : 'Copy Hashtag Set'}
      </Button>
      <Stack justifyContent='center' alignItems='center' gap={2}>
        <Card sx={{ width: '70%', backgroundColor: '#0f0f0f', color: '#fff' }}>
          <CardContent>
            <Typography
              variant='h5'
              sx={{
                textDecoration: 'underline',
              }}>
              Small Hashtags Used
            </Typography>
            <Typography mt={1}>{generatedSmall}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: '70%', backgroundColor: '#0f0f0f', color: '#fff' }}>
          <CardContent>
            <Typography
              variant='h5'
              sx={{
                textDecoration: 'underline',
              }}>
              Medium Hashtags Used
            </Typography>
            <Typography mt={1}>{generatedMedium}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: '70%', backgroundColor: '#0f0f0f', color: '#fff' }}>
          <CardContent>
            <Typography
              variant='h5'
              sx={{
                textDecoration: 'underline',
              }}>
              Large Hashtags Used
            </Typography>
            <Typography mt={1}>{generatedLarge}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: '70%', backgroundColor: '#0f0f0f', color: '#fff' }}>
          <CardContent>
            <Typography
              variant='h5'
              sx={{
                textDecoration: 'underline',
              }}>
              Extra Large Hashtags Used
            </Typography>
            <Typography mt={1}>{generatedExtraLarge}</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  )
}
