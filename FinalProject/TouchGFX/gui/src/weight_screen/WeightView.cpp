#include <gui/weight_screen/WeightView.hpp>
#include <touchgfx/Unicode.hpp>
#include <math.h>
#include "stm32f4xx_hal.h"
#include <cstdio>
#include <cstring>
extern "C" {
    #include "cmsis_os.h"
}

extern "C" osThreadId_t StartWeighingTaHandle;
extern UART_HandleTypeDef huart1;
WeightView::WeightView()
{

}

void WeightView::setupScreen()
{
    WeightViewBase::setupScreen();
    osThreadResume(StartWeighingTaHandle);
    updateWeightDisplay(0);
}

void WeightView::tearDownScreen()
{
    WeightViewBase::tearDownScreen();
    osThreadSuspend(StartWeighingTaHandle);
}

void WeightView::updateWeightDisplay(float newWeight)
{
	 int newWeight1 = (int)newWeight;
	 int newWeight2 = (int)((newWeight - newWeight1) * 100);

	if(newWeight1 < 0 ) newWeight1 = 0;
	if(newWeight2 < 0 ) newWeight2 = 0;
	Unicode::snprintf(textArea1Buffer1, TEXTAREA1BUFFER1_SIZE , "%d" ,newWeight1);
    Unicode::snprintf(textArea1Buffer2, TEXTAREA1BUFFER2_SIZE, "%d" ,newWeight2);
    textArea1.invalidate();

}
