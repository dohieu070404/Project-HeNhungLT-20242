#include <gui/model/Model.hpp>
#include <gui/model/ModelListener.hpp>
#include <cstdint>
#include <cstddef>
#include "cmsis_os2.h"

extern osMessageQueueId_t weighingDataQueueHandle;

Model::Model() : modelListener(0)
{


}

void Model::tick()
{
	float receivedWeight;

	 if (osMessageQueueGet(weighingDataQueueHandle, &receivedWeight, NULL, 0) == osOK)
	     {
	         // Nếu đọc thành công dữ liệu mới
	         if (receivedWeight != currentWeight)
	         {
	             currentWeight = receivedWeight; // Lưu giá trị trọng lượng mới

	             // Thông báo cho ModelListener (Presenter) rằng có dữ liệu mới
	             if (modelListener != 0)
	             {
	                 modelListener->updateWeight(currentWeight);
	             }
	        }
	 }
}
